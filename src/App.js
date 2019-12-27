    import React, { Component } from 'react';
    import Axios from 'axios';
  
    class App extends Component {
      constructor(props) {
        super(props)
      
        this.state = {
          userData:[],
          page : 1,
          per_page:25

        
        }
      }

      componentDidMount() {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
        // console.log(res.data)
          this.setState({userData:res.data})
        })
      }
      // for button 57
      handleClick = (pageNo) => {
        this.setState({page:pageNo})
      }

      rowChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

      render() {
     //*****************************pagination **********************************/
        let pageNo = this.state.page // using this.state.page from line no 10
        let per_page_no = this.state.per_page

        var toatalData = this.state.userData
        var toatla_page = Math.ceil(toatalData.length/per_page_no) //10
        

   
        let start = (pageNo-1)*per_page_no  //10
        let end = start + per_page_no // 10
        let slicedData = toatalData.slice(start,end)

        var pageNumbers = []
        for(var i=1; i<=toatla_page; i++){
               pageNumbers.push(i)
        }
         
     //  console.log(pageNumbers)
    // maping  pageNumbers ,using from line 32, then make a onclick function
       var button = pageNumbers.map(a => {
             return(

             <button className="btn btn-primary mr-1" onClick={() =>this.handleClick(a)}>{a}</button>
             )
       })

     //*********************pagination Above**********************************************/
            // removed userData(line 9) with slicedData
        let showUser = slicedData.map((each) => {
          return (
              <tbody>
                <tr>
                  <th scope="row">{each.id}</th>
                  <td>{each.title}</td>
                  <td>{each.body}</td>
                  <td> <button className="btn btn-success" >Edit</button></td>
                  <td> <button className="btn btn-danger">Delete</button></td>
                  
                  
                </tr>
            </tbody>
          )
        })
        return (
        <React.Fragment>
          <div className="container">
              {button}
                <table class="table">
                    <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">title</th>
                          <th scope="col">body</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                    </thead>
                        {showUser}
                </table>                    
          </div>  
             

      <select className="form-control offset-5 mb-5"
              style={{width:"120px"}} onChange={this.rowChange} name="per_page">

            <option value="" selected>Per Page</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
      </select>
        </React.Fragment>
        );
      }
    }

    export default App;