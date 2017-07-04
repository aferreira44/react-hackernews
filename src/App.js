import React, {Component} from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0
    }, {
        title: 'Redux',
        url: 'https://facebook.github.io/redux/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1
    }
];

const title = 'React App: Hello World!'

const author = 'André Ferreira'

const isSearched = (searchTerm) => (item) => !searchTerm || item
    .title
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title,
            author,
            list,
            searchTerm: ''
        }

        this.onDismiss = this
            .onDismiss
            .bind(this)

        this.onSearchChange = this
            .onSearchChange
            .bind(this)
    }

    onDismiss(id) {
        const isNotId = item => {
            return item.objectID !== id
        }

        const updatedList = this
            .state
            .list
            .filter(isNotId)

        this.setState({list: updatedList})
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value})
    }

    render() {
        const {author, title, list, searchTerm} = this.state
        return (
            <div className="App">
                <Header title={title} author={author}/>
                <Search value={searchTerm} onChange={this.onSearchChange}>
                    Search:
                </Search>
                <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}/>
            </div>
        );
    }
}

const Header = ({title, author}) => 
    <div>
        <h1>{title}</h1>
        <h3>Author: {author}</h3>
    </div>

const Button = ({
    onClick,
    className = '',
    children
}) => <button onClick={onClick} className={className} type="button">{children}</button>

const Search = ({value, onChange, children}) =>
<form>
    {children}
    <input type="text" value={value} onChange={onChange}/>
</form>

const Table = ({list, pattern, onDismiss}) =>
    <div>
        {list
            .filter(isSearched(pattern))
            .map(item => <div key={item.objectID}>
                <span>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span>
                    {item.author}
                </span>
                <span>
                    {item.num_comments}
                </span>
                <span>
                    {item.points}
                </span>
                <span>
                    <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
                </span>
            </div>)
        }
    </div>

export default App;