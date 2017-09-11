import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    const {fetchData} = this.props;
    const {selectValue} = this.state;
    fetchData(selectValue);
  }

  render() {
    const {stocks, isFetching, isError} = this.props;
    return (
      <div>
        <div>You can request stocks list</div>
        <button onClick={this.handleClick}>get list of stocks</button>
        {
        (isError) ? <div>error has occured</div> :
        (isFetching) ? <div>loading...</div> :
          <ul>
          {
          stocks.map((stock, i) => {
            return <li key={stock[0] + stock[1]}>{stock[2]}</li>
          })
          }
          </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocks,
  isFetching: state.isFetching,
  isError: state.isError
});

const mapDispatchToProps = {
  fetchData: fetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
