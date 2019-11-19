import * as React from 'react';
import { ExampleValue, FieldLabel } from '../../common-elements/fields';

import { l } from '../../services/Labels';
import { OptionsContext } from '../OptionsProvider';

const maxEnumValues = 32;

export interface EnumValuesProps {
  values: string[];
  type: string;
}

export class EnumValues extends React.PureComponent<EnumValuesProps> {
  static contextType = OptionsContext;
  render() {
    const { values, type } = this.props;
    const { enumSkipQuotes } = this.context;
    if (!values.length) {
      return null;
    }

    let filteredValues = values;
    let post;

    if (filteredValues.length > maxEnumValues) {
      filteredValues = filteredValues.slice(0, maxEnumValues);
      post = '... (too many values to display)';
    }

    return (
      <div>
        <FieldLabel>
          {type === 'array' ? l('enumArray') : ''}{' '}
          {filteredValues.length === 1 ? l('enumSingleValue') : l('enum')}:
        </FieldLabel>{' '}
        {filteredValues.map((value, idx) => {
          const exampleValue = enumSkipQuotes ? value : JSON.stringify(value);
          return (
            <React.Fragment key={idx}>
              <ExampleValue>{exampleValue}</ExampleValue>{' '}
            </React.Fragment>
          );
        })}
        {post}
      </div>
    );
  }
}
