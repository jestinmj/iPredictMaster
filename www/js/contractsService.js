/**
 * Created by DanHenton on 23/09/15.
 */
angular.module('app.services.contract', [])
    .factory('ContractService', function($http, $rootScope){

        var contracts = {
        // contractID : contract obj

            "0001" : {
                "buy"            : 1.20,
                "catId"          : 0,
                "dateModified"   : "00/00/00",
                "featuredText"   : "string",
                "id"             : "0001",
                "imageName"      : "gold",
                "judgeDate"      : "00/00/00",
                "judgeStatement" : "JUST DO IT",
                "last"           : 1.09,
                "longDesc"       : "Will the price of Gold prices rise by December 2015",
                "marketId"       : 0,
                "name"           : "GOLD.01DEC15.HI",
                "sell"           : 1.15,
                "shortDesc"      : "Will the price of Gold prices rise by December 2015",
                "startDate"      : "00/00/00",
                "tagIds"         : {"tagId": [0]},
                "type"           : 0
            },

            "0002" : {"buy": 0.89, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0002", "imageName": "gold", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.88, "longDesc": "Will the price of Gold Fall by December", "marketId": 0, "name": "GOLD.01DEC15.LOW","sell":0.92, "shortDesc": "Will the price of Gold Fall by December", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0003" : {"buy": 0.89, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0003", "imageName": "gold", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.83, "longDesc": "Will Gold prices stay the same until December", "marketId": 0, "name": "GOLD.15APR15.MID","sell":0.75, "shortDesc": "Will Gold prices stay the same until December", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0004" : {"buy": 1.23, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0004", "imageName": "johnKey", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 1.20, "longDesc": "Will John Key Remain as New Zealand's prime minister in 2016", "marketId": 0, "name": "JOHN.KEY.REMAINS.2015","sell":1.24, "shortDesc": "Will John Key Remain as New Zealand's prime minister in 2016", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0005" : {"buy": 0.49, "catId": 1, "dateModified": "00/00/00", "featuredText": "string", "id": "0005", "imageName": "money", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.48, "longDesc": "Will NZD continue to fall bellow $0.70", "marketId": 0, "name": "NZD.FALL.BELLOW.0.70","sell":0.42, "shortDesc": "Will NZD continue to fall bellow $0.70", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0006" : {"buy": 0.20, "catId": 1, "dateModified": "00/00/00", "featuredText": "string", "id": "0006", "imageName": "money", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.18, "longDesc": "Will NZD raise back up to above $0.70", "marketId": 0, "name": "NZD.RAISE.ABOVE.0.70","sell":0.18, "shortDesc": "Will NZD raise back up to above $0.70", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0007" : {"buy":0.35, "catId": 1, "dateModified": "00/00/00", "featuredText": "string", "id": "0007", "imageName": "leakyHome", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.35, "longDesc": "Will the Leaking home cost the government 200 million in repair costs in 2015", "marketId": 0, "name": "LEAKY.HOME.COST.2M","sell":0.32, "shortDesc": "Will the Leaking home cost the government 200 million in repair costs in 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0008" : {"buy":0.55, "catId": 2, "dateModified": "00/00/00", "featuredText": "string", "id": "0008", "imageName": "leakyHome", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.54, "longDesc": "Will the Leaking home cost the government 500 million in repair costs in 2015", "marketId": 0, "name": "LEAKY.HOME.COST.5M","sell":0.52, "shortDesc": "Will the Leaking home cost the government 500 million in repair costs in 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0009" : {"buy":0.35, "catId": 2, "dateModified": "00/00/00", "featuredText": "string", "id": "0009", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.35, "longDesc": "Will Wellington area receive a 4.0 to 4.8 Earthquake in before the end of 2015", "marketId": 0, "name": "WELL.EARTHQUAKE.LOW","sell":0.32, "shortDesc": "Will Wellington area receive a 4.0 to 4.8 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0010" : {"buy":0.42, "catId": 2, "dateModified": "00/00/00", "featuredText": "string", "id": "0010", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.43, "longDesc": "Wellington to receive a 4.9 to 5.4 Earthquake in before the end of 2015", "marketId": 0, "name": "WELL.EARTHQUAKE.MID","sell":0.39, "shortDesc": "Wellington to receive a 4.9 to 5.4 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0011" : {"buy":0.19, "catId": 3, "dateModified": "00/00/00", "featuredText": "string", "id": "0011", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.20, "longDesc": "Wellington to receive a 5.5 to 5.8 Earthquake in before the end of 2015", "marketId": 0, "name": "WELL.EARTHQUAKE.HI","sell":0.11, "shortDesc": "Wellington to receive a 5.5 to 5.8 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0012" : {"buy":0.17, "catId": 4, "dateModified": "00/00/00", "featuredText": "string", "id": "0012", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "JUST DO IT", "last": 0.19, "longDesc": "Wellington to receive an Earthquake above 5.8 in before the end of 2015", "marketId": 0, "name": "WELL.EARTHQUAKE.VHI","sell":0.09, "shortDesc": "Wellington to receive an Earthquake above 5.8 in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 }
        };

        var categories = [
            { id:  0, title: "NZ Foreign Affairs" },
            { id:  1, title: "NZ Politics" },
            { id:  2, title: "NZ Economics" },
            { id:  3, title: "NZ Election 2017" },
            { id:  4, title: "NZ Property" },
            { id:  5, title: "NZ Vote Share 2017" },
            { id:  6, title: "International Politics" },
            { id:  7, title: "NZ Head of State" },
            { id:  8, title: "NZ Pay Gaps" },
            { id:  9, title: "NZ Misc Issues" },
            { id: 10, title: "Pay-the-Searcher" },
            { id: 11, title: "Commodities" },
            { id: 12, title: "Financial Markets" },
            { id: 13, title: "US Politics" },
            { id: 14, title: "US Election 2016" },
            { id: 15, title: "US President 2016" },
            { id: 16, title: "US Economics" },
            { id: 17, title: "AUS Politics" },
            { id: 18, title: "Argentina Election" },
            { id: 19, title: "Canadian Election" },
            { id: 20, title: "European Election" },
            { id: 21, title: "British Election" },
            { id: 22, title: "British Politics" },
            { id: 23, title: "Eurozone Crisis" },
            { id: 24, title: "Science & Tech" },
            { id: 25, title: "North Korea" },
            { id: 26, title: "Student Issues" },
            { id: 27, title: "NZ Long-Term Econ" },
            { id: 28, title: "NZ Fonterra" }
        ];

        var serviceFunctions = {

            getContract: function(id){
                return contracts[id];
            },

            getAllCatgegories: function(){
                return categories;
            },

            getContractsInRange: function(from, to){
                var contractsInRange = [];
                var allContracts = serviceFunctions.getAllContracts();
                for (var i = from; i < to; i++){
                    if (allContracts[i]){
                        contractsInRange.push(allContracts[i]);
                    } else {  break; }
                }
                return contractsInRange;
            },

            getAllContracts: function() {
                var contractList = [];
                for(var contract in contracts){
                    contractList.push(contracts[contract]);
                }
                return contractList;
            },

            makeBundle: function(){
                console.log("Make test earthquake bundle");
                var contracts = [
                    serviceFunctions.getContract("0009"),
                    serviceFunctions.getContract("0010"),
                    serviceFunctions.getContract("0011"),
                    serviceFunctions.getContract("0012")
                ];
                var price = 0;
                for(var contract in contracts){
                    price += contract.buy;
                }
               return { name : "BUNDLE.WELL.EARTHQUAKE", price : price, contracts : contracts};
            }



        };
        return serviceFunctions
    });