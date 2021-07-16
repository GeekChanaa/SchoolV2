    using System;
    using System.Collections.Generic;

    namespace SchoolApi.Models
    {
        public class State
        {
            public int ID { get; set; }
            public int CountryID { get; set; }
            public string Name { get; set; }
            public string State_code { get; set; }
            public virtual Country Country { get; set; }
            public virtual ICollection<City> Cities { get; set; }
        }
    }