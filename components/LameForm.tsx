import React, { FormEvent } from 'react';
import * as helpers from '../lib/helpers';

class Dropdown extends React.Component<{}, { msg: string }> {
  constructor() {
    super();
    this.state = { msg: '' };
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
  }

  handleStatusUpdate(e: { target: HTMLSelectElement }) {
    const val = e.target.value as helpers.Status;
    this.setState({
      msg: helpers.makeStatusResponse(val)
    });
  }

  render() {
    return (
      <label>
        Status
        <select defaultValue={helpers.Status.Good}
                onChange={this.handleStatusUpdate}>
          <option value={helpers.Status.Good}>good</option>
          <option value={helpers.Status.Bad}>bad</option>
        </select>
        <span>{this.state.msg}</span>
      </label>
    );
  }
}

class LameForm extends React.Component<{}, { greeting: string }> {
  constructor() {
    super();
    this.state = {
      greeting: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const firstField: HTMLInputElement | null = document.querySelector('#first');
    const lastField: HTMLInputElement | null = document.querySelector('#last');
    const first = firstField ? firstField.value: '';
    const last = lastField ? lastField.value : '';
    this.setState({
      greeting: helpers.greetUser(first, last)
    });
  }

  render() {
    return (
      <div>
        <section>{this.state.greeting}</section>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            first name
            <input type="text" name="first" id="first" />
          </label>
          <label>
            last name
            <input type="text" name="last" id="last" />
          </label>
          <Dropdown />
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default LameForm;