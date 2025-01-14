namespace PortfolioBlog.Server.Models.ResultWrapper
{
    public class ResultWrapper
    {
        public bool result { get; set; }
        public string? message { get; set; }
        public object? obj { get; set; }

        public ResultWrapper(bool result, string message)
        {
            this.result = result;
            this.message = message;
        }

        public ResultWrapper(bool result)
        {
            this.result = result;
        }

        public ResultWrapper() { }
    }

    public class ResultWrapper<T>
    {
        public bool result { get; set; }  // Whether the operation was successful
        public string? message { get; set; }  // Message for success or failure
        public T obj { get; set; }  // Optional object to return with the result

        // Constructor for success without an object

        public ResultWrapper()
        {
        }
        public ResultWrapper(bool result, string message)
        {
            this.result = result;
            this.message = message;
        }

        // Constructor for success with an object
        public ResultWrapper(bool result, string message, T obj)
        {
            this.result = result;
            this.message = message;
            this.obj = obj;
        }



        // Static method for success response
        public static ResultWrapper<T> Success(string message, T obj = default)
        {
            return new ResultWrapper<T>(true, message, obj);
        }

        // Static method for failure response
        public static ResultWrapper<T> Failure(string message)
        {
            return new ResultWrapper<T>(false, message);
        }
    }

}

