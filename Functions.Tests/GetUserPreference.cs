using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using FrontendAPIFunctionApp;
using FrontendAPIFunctionApp.Interfaces;
using FrontendAPIFunctionApp.Models;
using FrontendAPIFunctionApp.Repositories;
using FrontendAPIFunctionApp.Tests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestPlatform.ObjectModel;
using Moq;
using Newtonsoft.Json;
using Xunit;

namespace GetUserPreferenceTest
{
    public class GetUserPreferenceTest
    {
        public Mock<IAdminServiceSqlRepository> mock = new Mock<IAdminServiceSqlRepository>();
        private static Mock<HttpRequest> CreateMockRequest(object body)
        {
            var ms = new MemoryStream();
            var sw = new StreamWriter(ms);

            var json = JsonConvert.SerializeObject(body);

            sw.Write(json);
            sw.Flush();

            ms.Position = 0;

            var mockRequest = new Mock<HttpRequest>();
            mockRequest.Setup(x => x.Body).Returns(ms);

            return mockRequest;
        }

        private static Mock<HttpRequest> CreateMockRequest(string queryString)
        {
            var mockRequest = new Mock<HttpRequest>();
            if (!queryString.Equals(""))
            {
                string[] queries = queryString.Split(',');
                foreach (string keyval in queries)
                {
                    string[] pair = keyval.Split(':');
                    mockRequest.Setup(x => x.Query[pair[0]]).Returns(pair[1]);
                }
            }

            return mockRequest;
        }

        [Fact]
        public async void Test_NoQueryParam()
        {
            Mock<HttpRequest> request = CreateMockRequest("");
            GetUserPreference api = new GetUserPreference(mock.Object);
            var response = await api.Run(request.Object, new Mock<ILogger>().Object) as OkObjectResult;
            ErrorMessage em = response.Value as ErrorMessage;
            Assert.Equal(0, em.Status);
            Assert.True(em.Message.Equals("No query parameters provided"));
        }

        [Fact]
        public async void Test_EmptyStringQuery()
        {
            Mock<HttpRequest> request = CreateMockRequest("email:");
            // mock.Setup(p => p.GetLatestApiConfiguration()).Throws(new Exception("Cannot connect to db"));
            GetUserPreference api = new GetUserPreference(mock.Object);
            var response = await api.Run(request.Object, new Mock<ILogger>().Object) as OkObjectResult;
            ErrorMessage em = response.Value as ErrorMessage;
            Assert.Equal(0, em.Status);
            Assert.True(em.Message.Equals("Provide an email id"));
        }

        [Fact]
        public async void Test_GetUserPreferenceHelperMisbehaves()
        {
            int called = 0;
            Mock<HttpRequest> request = CreateMockRequest("email:abcd@gmail.com");
            mock
                .Setup(p => p.GetSomeUserPreferences(It.IsAny<string>()))
                .ReturnsAsync(() =>
                {
                    called++;
                    return new List<UserPreference>();
                });
            // mock.Setup(p => p.GetLatestApiConfiguration()).Throws(new Exception("Cannot connect to db"));
            GetUserPreference api = new GetUserPreference(mock.Object);
            var response = await api.Run(request.Object, new Mock<ILogger>().Object) as OkObjectResult;
            List<UserPreference> lup = response.Value as List<UserPreference>;
            Assert.True(called > 0);
            Assert.True(lup[0].EmailId.Equals("abcd@gmail.com"));
            Assert.True(lup[0].GridConfig.Equals(""));
        }
    }
}
