using SchoolApi.Models;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class SchoolDataContext : DbContext
    {
        // This class instance represents a session with the database and can be used to query and save instances of our entities
        public SchoolDataContext(DbContextOptions<SchoolDataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
        }

        public DbSet<SchoolApi.Models.AbsenceJustification> AbsenceJustification { get; set; }
        public DbSet<SchoolApi.Models.Assignment> Assignment { get; set; }

        public DbSet<SchoolApi.Models.Attendance> Attendance { get; set; }

        public DbSet<SchoolApi.Models.Chapter> Chapter { get; set; }

        public DbSet<SchoolApi.Models.City> City { get; set; }

        public DbSet<SchoolApi.Models.Classroom> Classroom { get; set; }

        public DbSet<SchoolApi.Models.Country> Country { get; set; }

        public DbSet<SchoolApi.Models.Course> Course { get; set; }

        public DbSet<SchoolApi.Models.Department> Department { get; set; }

        public DbSet<SchoolApi.Models.DocumentRequest> DocumentRequest { get; set; }

        public DbSet<SchoolApi.Models.Exam> Exam { get; set; }

        public DbSet<SchoolApi.Models.Grade> Grade { get; set; }

        public DbSet<SchoolApi.Models.Module> Module { get; set; }

        public DbSet<SchoolApi.Models.Room> Room { get; set; }

        public DbSet<SchoolApi.Models.School> School { get; set; }

        public DbSet<SchoolApi.Models.Session> Session { get; set; }

        public DbSet<SchoolApi.Models.State> State { get; set; }

        public DbSet<SchoolApi.Models.Student> Student { get; set; }

        public DbSet<SchoolApi.Models.SubModule> SubModule { get; set; }

        public DbSet<SchoolApi.Models.Teacher> Teacher { get; set; }

        public DbSet<SchoolApi.Models.Training> Training { get; set; }
        public DbSet<SchoolApi.Models.Translation> Translation { get; set; }
        public DbSet<SchoolApi.Models.Timezone> Timezone { get; set; }
        public DbSet<SchoolApi.Models.User> User { get; set; }
    }
}