import {useState, useEffect} from 'react';

export default httpClient=>{
    const [error, setError]=useState(null);

    // componentWillMount(){
    //     this.reqInterceptor=axios.interceptors.request.use(request=>{
    //         this.setState({error:null});
    //         return request;
    //     });
    //     this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{
    //        this.setState({error:error}); 
    //     });
    // }
    //execute before JSX code gets executes which is not possible with useEffect as it executes after JSX so use useEffect for compoenentDidMount
    //solution is as below

    const reqInterceptor=httpClient.interceptors.request.use(request=>{
           setError(null);
                return request;
            });
    const resInterceptor=httpClient.interceptors.response.use(res=>res,err=>{
            setError(err); 
            });

    // componentWillUnmount(){
    //     //console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
    //     axios.interceptors.request.eject(this.reqInterceptor);
    //     axios.interceptors.response.eject(this.resInterceptor);
    // }
    //for componentWillUnmount we can use useEffect coz the function we pass into this, if we return a function there, that will be our CLEAN up function and for unmount we need to pass 2nd argument as [] array, coz react will check all elements we pass and only when their values change, it will re-run useEffect function & also useEffect clean-up function.
    
    useEffect(()=>{
        return()=>{
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    },[reqInterceptor,resInterceptor]);

    const errorConfirmedHandler=()=>{
        setError(null);
    };

    return[error,errorConfirmedHandler];
}

//copy whole logic code from withErrorHandler.js and convert all AXIOS to httpCLient the const we created.