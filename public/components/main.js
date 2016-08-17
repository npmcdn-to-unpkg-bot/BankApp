
const MainComponent = React.createClass({
  getInitialState(){
    // fetch('/transactions')
    // .then(res=>res.json())
    // .then(data=>{
    //   this.setState({transactions : data});
    // });
    this.fetchData();
    return {
      transactions : [],
      catrans : []
    }
  },
  fetchData(){
    fetch('/transactions')
    .then(res=>res.json())
    .then(data=>{
      this.setState({transactions : data,catrans : data});
    });
  },
  deletetrans(id){
    fetch(`/transactions/${id}`,{
      method: "DELETE",
    }).then(()=>this.fetchData())
  },
  addtrans(trans){
    //let json=JSON.stringify(trans);
    fetch('/transactions',{
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(trans)
    })
    .then(()=>this.fetchData())
  },
  showCredits(){
    fetch('/transactions/credits')
    .then(res=>res.json())
    .then(data=>{
      this.setState({transactions : data});
    });
  },
  showDebits(){
    fetch('/transactions/debits')
    .then(res=>res.json())
    .then(data=>{
      this.setState({transactions : data});
    });
  },
  render(){
    return (
      <div>
        <h3>Welcome to -- Bank</h3>
        <TransForm addtrans={this.addtrans}/>
        <AccInfo transactions={this.state.catrans}/>
        <button onClick={this.showCredits}>Credits</button>
        <button onClick={this.showDebits}>Debits</button>
        <button onClick={this.fetchData}>Both</button>
        <ShowTrans transactions={this.state.transactions} deletetrans={this.deletetrans}/>
      </div>
    );
  }
});

const AccInfo = React.createClass({
  //getInitialState
  render(){
    let credit=0,debit=0;
    this.props.transactions.forEach(transaction=>{
      if(transaction.type === 'Debit'){
        debit += transaction.amount;
      }else{

        credit += transaction.amount;
      }
    });
    let bal = credit - debit;
    // if (bal<0){
    //   bal = "N/A";
    // }
    return(
      <div>
        <br/>
          <span>Account Balance :${bal} , </span>
          <span> Debits :${debit} , </span>
          <span> Credits :${credit}</span><br/><br/>
      </div>
    );
  }
});



const ShowTrans = React.createClass({
  deletetrans(e){
    //console.log(e.target.value);
    this.props.deletetrans(e.target.value);
  },
  render(){
    let $tr = this.props.transactions.map(transaction=>{
      return (
        <tr key={transaction._id}>
          <td>{transaction._id}</td>
          <td>{transaction.name}</td>
          <td>{transaction.type}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.date}</td>
          <td>
            <button
              value={transaction._id}
              onClick={this.deletetrans}
              className="btn btn-danger btn-xs">Delete</button>
            {/* <button className="btn btn-default btn-xs">Modify</button> */}
          </td>
        </tr>
      );
    });
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Transc. ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {$tr}
        </tbody>
      </table>
    );
  }
});




const TransForm = React.createClass({
  getInitialState(){
    return{
      tranName : '',
      amount : '',
      type : 'Credit'
    }
  },
  addtrans(e){
    e.preventDefault();
    let trans=
      {
        name : this.state.tranName,
        type: this.state.type,
        amount : this.state.amount
      };
    // console.log("trans",trans);
    this.props.addtrans(trans);
    this.resetForm();
  },
  transtype(e){
    let type = e.target.value;
    if (type === 'Credit'){

      this.setState({type : 'Credit'});
    }else{
      this.setState({type : 'Debit'});


    }
  },
  resetForm(){
    //e.preventDefault();
    this.setState({tranName : '',amount:''});
  },
  render(){
    return(
      <form onSubmit={this.addtrans}>
        <label>Transaction Type </label>
        <select onChange={this.transtype}>
          <option value="Credit"> Credit </option>
          <option value="Debit"> Debit </option>
        </select><br/><br/>
        <input
          value={this.state.tranName}
          onChange={e=>this.setState({tranName: e.target.value})}
          type="text"
          placeholder="Transaction Name"
        /><br/><br/>
        <input
          value={this.state.amount}
          onChange={e=>this.setState({amount: e.target.value})}
          type="number"
          placeholder="Amount"
        /><br/><br/>
        <button type="sumbit">Add</button>
        <button onClick={this.resetForm}>Reset</button>
      </form>
    );
  }
});

ReactDOM.render(
  <MainComponent/>,
  document.getElementById('root')
);
