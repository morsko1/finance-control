import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchData,
  fetchSingleStock
 } from '../../actions';
 import {
  Link
 } from 'react-router-dom';
import './style.scss';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleSingleStock = this.handleSingleStock.bind(this);
  }
  handleClick () {
    const {fetchData} = this.props;
    fetchData();
  }

  handleSingleStock(event) {
    const {fetchSingleStock} = this.props;
    fetchSingleStock(event.target.dataset.ticker);
  }

  render() {
    const {stocks, stock, isFetching, isError} = this.props;
    return (
      <div>
        <Link to="./portfolio">Go to Portfolio</Link>
        <h4>You can request stocks list</h4>
        <button onClick={this.handleClick}>get list of stocks</button>
        <div className="home-container">
          <div className="full-list">
          {
          (isError) ? <div>error has occured</div> :
          (isFetching) ? <div>loading...</div> :
            <ul>
            {
            stocks.map((stock, i) => {
              return (
                <li
                  className="stock-li"
                  data-ticker={stock[0]}
                  key={stock[0] + stock[1]}
                  onClick={this.handleSingleStock} >
                    {stock[2]}
                </li>
              );
            })
            }
            </ul>
          }
          </div>
          <div className="single-stock">
            <div>Ticker: {stock[0]}</div>
            <div>Name: {stock[9]}</div>
            <div>Price: {stock[3]} &#8381;</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocks,
  stock: state.stock,
  isFetching: state.isFetching,
  isError: state.isError
});

const mapDispatchToProps = {
  fetchData: fetchData,
  fetchSingleStock: fetchSingleStock
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
