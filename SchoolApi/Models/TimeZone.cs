using System;

namespace SchoolApi.Models
{
    public class Timezone
    {
        public int ID { get; set; }
        public string ZoneName { get; set; }
        public string GmtOffset { get; set; }
        public string GmtOffsetName { get; set; }
        public string Abbreviation { get; set; }
        public string TzName { get; set; }
    }
}