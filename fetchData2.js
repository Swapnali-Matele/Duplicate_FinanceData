//const mongoose = require('mongoose');
const axios = require("axios");
const quoteSchema = require("../model/quoteSchema");
//const Quotes = require('./service/dataSave');

//const assert = require('assert');
//const {quoteSchema} = require('../model/quoteSchema');

const getPost = async (req, res) => {
  //let offset = req.body.offsetValue
  //const offsetI = 0;
  const Size = 10
  let offset = 0 + Size ;
  
  const params = new URLSearchParams({ offset: `${offset}`, size: Size  });
  params.append('offset', `${offset}`);
  try {
    const options = {
      method: "POST",
      url: "https://yh-finance.p.rapidapi.com/screeners/list",
      params: {
        quoteType: "MUTUALFUND",
        sortField: "fundnetassets",
        region: "US",
        size: "50",
        offset: `${offset}`,
        sortType: "DESC",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d1de5b782fmsh42fc9a3363de012p169536jsn3cb41ce5d8c4",
        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
      },
      data: '[{"operator":"or","operands":[{"operator":"EQ","operands":["exchange","NAS"]},{"operator":"EQ","operands":["exchange","NYQ"]}]}]',
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);

        const financeData = response.data.finance.result[0];
        //console.log(financeData);
        console.log("outer for loop")
        if (offset > 0) {
          if (offset > 1000) {
            return console.log("All Data are consumed")
          } else {
            for (let i = 0; i < financeData.quotes.length; i++) {
              const Quotes = new quoteSchema({
                fullExchangeName: financeData.quotes[i]["fullExchangeName"],
                quoteType: financeData.quotes[i]["quoteType"],
                market: financeData.quotes[i]["market"],
                region: financeData.quotes[i]["region"],
                currency: financeData.quotes[i]["currency"],
                longName: financeData.quotes[i]["longName"],
              });
              const Data = Quotes.save();
            }
            getPost(offset++);
          }
        } else {
          return console.log("All Data are saved");
        }

        console.log("after for loop");
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPost,
};
