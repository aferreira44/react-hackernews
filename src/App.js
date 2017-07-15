import React, {Component} from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 100;

const PATH_BASE = 'https:/hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

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
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY
        }

        this.setSearchTopStories = this
            .setSearchTopStories
            .bind(this);

        this.fetchSearchTopStories = this
            .fetchSearchTopStories
            .bind(this);

        this.onDismiss = this
            .onDismiss
            .bind(this);

        this.onSearchChange = this
            .onSearchChange
            .bind(this);

        this.onSearchSubmit = this
            .onSearchSubmit
            .bind(this);
    }

    setSearchTopStories(result) {
        const {hits, page} = result;

        const oldHits = page !== 0
            ? this.state.result.hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            result: {
                hits: updatedHits,
                page
            }
        });
    }

    fetchSearchTopStories(searchTerm, page) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result));
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }

    onDismiss(id) {
        const isNotId = item => item.objectID !== id;

        const updatedHits = this
            .state
            .result
            .hits
            .filter(isNotId);

        this.setState({
            result: {
                ...this.state.result,
                hits: updatedHits
            }
        });
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value})
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
        event.preventDefault();
    }

    render() {
        const {author, title, searchTerm, result} = this.state;

        const page = (result && result.page) || 0;

        if (!result) {
            return null;
        }

        return (
            <div className="page">
                <div className="interactions">
                    <Header title={title} author={author}/>
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}>
                        Search:
                    </Search>
                </div>
                {result && <Table list={result.hits} onDismiss={this.onDismiss}/>}
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>More</Button>
                </div>
            </div>
        );
    }
}

// Define Components
const Header = ({title, author}) => <div>
    <h1>{title}</h1>
    <h3>Author: {author}</h3>
</div>

const Button = ({
    onClick,
    className = '',
    children
}) => <button onClick={onClick} className={className} type="button">{children}</button>

const Search = ({value, onChange, onSubmit, children}) => <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange}/>
    <button type="submit">{children}</button>
</form>

const Table = ({list, onDismiss}) => <div className="table">
    {list.map(item => <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>
            {item.author}
        </span>
        <span style={smallColumn}>
            {item.num_comments}
        </span>
        <span style={smallColumn}>
            {item.points}
        </span>
        <span style={smallColumn}>
            <Button onClick={() => onDismiss(item.objectID)} className="button-inline">Dismiss</Button>
        </span>
    </div>)
}
</div>

// Define style objects
const smallColumn = {
    width: '10%'
}
const midColumn = {
    width: '30%'
}
const largeColumn = {
    width: '40%'
}

export default App;