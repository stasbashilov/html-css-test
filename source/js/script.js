const subscribeButton = document.querySelector('[data-action="subscribe"]');
const subscribeInput = document.querySelector('[data-input="subscribe"]');

const errorClass = 'error';

const validateEmail = email => {
  const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const testResult = pattern.test(email);

  return testResult;
};

subscribeInput.addEventListener('change', () => {
  subscribeInput.classList.remove(errorClass);
});

const handleButtonSubscribeClick = () => {
  if (validateEmail(subscribeInput.value)) {
    subscribeInput.classList.remove(errorClass);
  } else {
    subscribeInput.classList.add(errorClass);
  }
};

subscribeButton.addEventListener('click', handleButtonSubscribeClick);

const List = ({ list }) => {
  return list.map((item, index) => {
    return (
      <div className='news-card' key={index}>
        <div className='news-card__img imageHolder mb-30'>
          <img src={`https://picsum.photos/id/10${index}/367/267`} />
        </div>
        <h3 className='news-card__title'>{item.title}</h3>
        <div className='news-card__text mt-15'>{item.body}</div>
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
            more news
          </button>
        )}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<News />, document.getElementById('news'));
