import React from 'react';
import { render, queryAllByTestId, act, getByText, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import {episodeData} from "../test-data"
import userEvent from '@testing-library/user-event';
import App from './App';



// const showData = {data:{
//     _embedded: {
//         episodes: [
//             {
//                 id: 2993,
//                 name: "Chapter One: The Vanishing of Will Byers",
//                 season: 1,
//                 number: 1,
//                 runtime: 60,
//                 image: {
//                     medium: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
//                 },
//                 summary: "<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.<\/p>",
//             },
//             {
//                 id: 553946,
//                 name: "Chapter One: MADMAX",
//                 season: 2,
//                 number: 1,
//                 runtime: 60,
//                 image: {
//                     medium: "http://static.tvmaze.com/uploads/images/medium_landscape/132/331976.jpg",
//                 },
//                 summary: "<p>One year after the events with the Upside Down and the Demogorgon, Will meets with a government doctor. The boys discover that there's a new player in town, and Jim pays a visit to El.<\/p>",
//             },
//             {
//                 id: 578663,
//                 name: "Chapter One: Suzie, Do You Copy?",
//                 season: 3,
//                 number: 1,
//                 runtime: 51,
//                 image: {
//                     medium: "http://static.tvmaze.com/uploads/images/medium_landscape/204/510098.jpg",
//                 },
//                 summary: "<p>Things change over the summer: Jonathan, Nancy, Steve, and Billy get jobs; Dustin goes to science camp; El and Mike become an item; Lucas and Max almost become an item. Meanwhile, mysterious power outages plague Hawkins and rats start exploding.<\/p>",

//             },
//             {
//                 id: 1752754,
//                 name: "Chapter One: The Hellfire Club",
//                 season: 4,
//                 number: 1,
//                 runtime: 60,
//                 image: null,
//                 summary: null,

//             }
//         ]
//     }
// }
// }


jest.mock('./api/fetchShow');
// test("renders data after api is called", async () => {
//     act(()=> {
//     mockFetchShow.mockResolvedValueOnce(showData);
//     });
//     const { queryByText, debug } = render(<App />);
//     await waitFor(() => {
//         const selection = getByText(/Select a season/i)
//         fireEvent.click(selection)

//     }
//     );

//     expect(queryByText(/chapter one/i)).toHaveLength(4)
//     expect(mockFetchShow).toHaveBeenCalled(1);
// });

test("renders once loaded", async () => {
    act(() => {
      mockFetchShow.mockResolvedValueOnce(episodeData);
    });
    const { getAllByTestId, getByText, queryByText, debug } = render(<App />);
    waitForElementToBeRemoved(queryByText(/Fetching data.../i)).then(() => {
      const selection = getByText(/Select a season/i);
      userEvent.click(selection, 'Select a season')
    const season2 = getByText(/season 2/i);
    userEvent.click(season2);
      debug()
      expect(getAllByTestId(/episodes/i)).toBeVisible();
    });
  });

