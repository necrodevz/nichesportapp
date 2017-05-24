import React, { Component, PropTypes } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {connect} from 'react-redux'


const Form = ({mailing:{name, email, entityType, entityName, entities}, checkEntityType, handleChange}) => { 
        return(
         <form id='mailingList'>
            <TextField 
              floatingLabelText="Name"
              id='name'
              value={name}
              onChange={handleChange}
            />
            <br />
            <TextField
              floatingLabelText="Email"
              id='email'
              value={email}
              onChange={handleChange}
            />
            <br />
            <SelectField
              floatingLabelText='Select type of account desired'
              id='entityType'
              value={entityType}
              onChange={handleChange}
              >
                {
                entities.map((entity, key) => {
                  <MenuItem value={entity} primaryText={entity.toUpperCase()} />
                })
                }
              </SelectField>
              <br/>
            <TextField
              floatingLabelText={`Name of ${entityType}`}
              id='entityName'
              value={entityName}
              //disabled={checkEntityType}
              onChange={handleChange}
            />
         </form>
        )
}
// We use the gql tag to parse our query string into a query document
const EntityTypes = gql`
  query enumValuesOfMailingListItemEntity {
  __type(name: "MAILING_LIST_ITEM_ENTITY") {
    name
    enumValues {
      name
    }
  }
}
`;

const CreateMailingListItem = gql `
    mutation createMailingListItem($name:String!, $email:String!, $entityName:String, $entityType: Enum!){
        createMailingListItem(name:$name, email:$email, entityName:$entityName, entityType: $entityType){
            id
            name
        }
    }`
    
const mapStateToProps =(state) =>
{
  return {
    mailing: state.mailing
  }
}

export const FormWithMutations = graphql(CreateMailingListItem)(Form)    
export const FormWithData = graphql(EntityTypes)(Form);

const FormWithDataAndMutations = compose(
    graphql(EntityTypes),
    graphql(CreateMailingListItem),
    connect(mapStateToProps)
    )(Form)

export default FormWithDataAndMutations

