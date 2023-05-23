import Realm from 'realm';
let realm;
const usertableName = 'User_details';
const newstableName = 'News_details';
const usertableField = {
  user_id: {type: 'int', default: 0},
  user_Fname: 'string',
  user_Lname: 'string',
  user_Email: 'string',
  user_Pass: 'string',
  user_Profile: 'string',
};
const newstableField = {
  News_id: {type: 'int', default: 0},
  News_author_name: 'string',
  News_title: 'string',
  News_url: 'string',
  News_description: 'string',
  News_content: 'string',
};

export function CreateSchema() {
  return (realm = new Realm({
    path: 'NewsDatabases.realm',
    schema: [
      {
        name: usertableName,
        properties: usertableField,
      },
      {
        name: newstableName,
        properties: newstableField,
      },
    ],
  }));
}
