using System.Collections.Generic;

namespace SchoolApi.Models
{
    public class Country
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Iso3 { get; set; }
        public string Iso2 { get; set; }
        public string Phone_code { get; set; }
        public string Capital { get; set; }
        public string Currency { get; set; }
        public string Currency_symbol { get; set; }
        public string Tld { get; set; }
        public string Native { get; set; }
        public string Region { get; set; }
        public string Subregion { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Emoji { get; set; }
        public string EmojiU { get; set; }

        public int? TranslationID { get; set; }

        public ICollection<State> States { get; set; }
        public ICollection<Timezone> Timezones { get; set; }
        public Translation Translations { get; set; }
        
    }
}