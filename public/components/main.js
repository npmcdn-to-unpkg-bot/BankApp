
const MainComponent = React.createClass({
  getInitialState(){
    // fetch('/transactions')
    // .then(res=>res.json())
    // .then(data=>{
    //   this.setState({transactions : data});
    // });
    this.fetchData();
    return {
      transactions : []
    }
  },
  fetchData(){
    fetch('/transactions')
    .then(res=>res.json())
    .then(data=>{
      this.setState({transactions : data});
    });
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
  render(){
    return (
      <div>
        <h3>Welcome to -- Bank</h3>
        <TransForm addtrans={this.addtrans}/>
        <AccInfo transactions={this.state.transactions}/>
        <ShowTrans transactions={this.state.transactions}/>
      </div>
    );
  }
});

const AccInfo = React.createClass({
  render(){
    return(
      <div>
        <br/><span>Account Balance : </span><span> Debits : </span><span> Credits : </span><br/><br/>
      </div>
    );
  }
});



const ShowTrans = React.createClass({
  render(){
    let $tr = this.props.transactions.map(transaction=>{
      return (
        <tr key={transaction._id}>
          <td>{transaction._id}</td>
          <td>{transaction.name}</td>
          <td>{transaction.type}</td>
          <td>{transaction.amount}</td>
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
    let trans={name : this.state.tranName,type: this.state.type,amount : this.state.amount};
    // console.log("trans",trans);
    this.props.addtrans(trans);
  },
  transtype(e){
    let type = e.target.value;
    if (type === 'Credit'){

      this.setState({type : 'Credit'});
    }else{
      this.setState({type : 'Debit'});


    }
  },
  resetForm(e){
    e.preventDefault();
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
        <input value={this.state.tranName} onChange={e=>this.setState({tranName: e.target.value})} type="text" placeholder="Transaction Name"/><br/><br/>
        <input value={this.state.amount} onChange={e=>this.setState({amount: e.target.value})} type="number" placeholder="Amount"/><br/><br/>
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
