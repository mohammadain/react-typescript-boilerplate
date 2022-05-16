// export interface Contact {
//   contacts : {
//     accountId: string,
//     assignee: string | null,
//     createdAt: string,
//     id: string,
//     img: string | null,
//     messagesReceived: number,
//     messagesSent: number,
//     name: string,
//     phoneNumber: string,
//     platformNames: Array<string>,
//     length: number,
//     tags: Array<string>
//   },
//   nextPage: string
// }

export type Contact = {
  id:               string;
  accountId:        string;
  type:             string;
  name:             string;
  phoneNumber:      string;
  platformNames:    any[];
  messagesSent:     number;
  messagesReceived: number;
  createdAt:        string;
  img:              null;
  assignee:         null;
  tags:             Tag[];
}


export type Tag = {
  name: string;
}