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


const Loader = () => <div className='loading' />;

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
  state = { fullList: [], viewList: [], loading: true };

  count = 0;

  componentDidMount() {

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(list => {
        this.setState({
          fullList: list,
          viewList: getItems(list, this.count),
          loading: false
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
      this.state.loading ? (
        <Loader /> 
       ) : (
        <React.Fragment>
          <List list={this.state.viewList} />
          {viewList.length < fullList.length && (
            <button className='more-btn' onClick={this.handleLoadMoreClick}>
              more news
            </button>
          )}
        </React.Fragment>
        )
    );
  }
}

ReactDOM.render(<News />, document.getElementById('news'));


class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true,
    };
  }

  componentDidMount() {
    // метод компонента, который отрисовался в ДОМ, вызывается один раз после отрисовки компонента, чаще всего используется для асинхронных запросов

    fetch('https://jsonplaceholder.typicode.com/photos')
      //fetch это аякс запрос
      // метод then принимает в качестве аргумента функцию, которая в качестве аргумента принимает результат запроса

      .then(res => res.json())
      .then(res => {
        let counter = 0;
        let list = [];
        let accum = [];

        for (let i = 0; i < res.length; i++) {
          if (counter === 3) {
            list.push(accum);
            counter = 0;
            accum = [];
            accum.push(res[i]);
            counter++;
            continue;
          }

          accum.push(res[i]);
          counter += 1;
        }

        if (accum.length) {
          list.push(accum);
        }

        this.setState({
          list,
          loading: false,
        });
      });
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      this.state.list.map((i, index) => (
        <div key={index} className='galery-card'>
          <div className='galery-card__img galery-card__img--lg'>
            <img src={i[0].url} alt={i[0].title} />
          </div>
          <div className='galery-card__wrapper'>
            {i[1] && (
              <div className='galery-card__img galery-card__img--s'>
                <img src={i[1].thumbnailUrl} alt={i[1].title} />
              </div>
            )}
            {i[2] && (
              <div className='galery-card__img galery-card__img--s'>
                <img src={i[2].thumbnailUrl} alt={i[2].title} />
              </div>
            )}
          </div>
        </div>
      ))
    );
  }
}

ReactDOM.render(<Gallery />, document.getElementById('galery'));

// каждый вызов сетСтейт вызывает вызов метода рендер компонента