import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App, {Search, Button, Table} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App/>, div);
});

describe('Search', () => {
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Search>Search</Search>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Button>Give Me More</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Table', () => {
  const props = {
    list: [
      {
        title: 1,
        author: '1',
        num_comments: 1,
        points: 2,
        objectID: 'y'
      }, {
        title: 2,
        author: '2',
        num_comments: 1,
        points: 2,
        objectID: 'z'
      }
    ]
  };

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Table {...props}/>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Table { ...props } />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});