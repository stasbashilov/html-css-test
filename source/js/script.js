const List = ({ list }) => {
  return list.map((item, index) => {
    return (
      <div className='news-card' key={index}>
        <div className='imageHolder mb-30'>
          <img src={`https://picsum.photos/id/10${index}/367/267`} />
        </div>
        <div className='title title--xs'>{item.title}</div>
        <div className='description mt-15'>{item.body}</div>
      </div>
    );
  });
};

const getItems = (list, index) => {
  const arr = [...list];
  return arr.splice(index, 6);
};

class News extends React.Component {
  state = { fullList: [], viewList: [] };

  count = 0;

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(list => {
        this.setState({
          fullList: list,
          viewList: getItems(list, this.count),
        });
      });
  }

  handleLoadMoreClick = () => {
    this.count += 6;
    this.setState({
      viewList: [
        ...this.state.viewList,
        ...getItems(this.state.fullList, this.count),
      ],
    });
  };

  render() {
    const { viewList, fullList } = this.state;

    return (
      <React.Fragment>
        <List list={this.state.viewList} />
        {viewList.length < fullList.length && (
          <button className='more-btn glow' onClick={this.handleLoadMoreClick}>
            Load More
          </button>
        )}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<News />, document.getElementById('news'));
