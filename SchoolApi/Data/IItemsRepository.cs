using SchoolApi.Helpers;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SchoolApi.Models;

namespace SchoolApi.Data
{
    public interface IItemsRepository<T,P>
    {
        Task<PagedList<T>> Get(P itemParams);

    }
}