namespace SchoolApi.Helpers
{
    public class SessionParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        public int PageSize {get;set;} = 5;
        public string OrderBy { get; set; }
        public string SearchBy {get; set;}
        public string SearchValue {get; set;}
        public string FilterBy { get; set; }
        public string FilterValue { get; set; }
        public string ReverseOrder { get; set; }

        
    }
}