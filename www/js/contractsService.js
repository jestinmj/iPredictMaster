/**
 * Created by DanHenton on 23/09/15.
 */
angular.module('app.services.contract', [])
    .factory('ContractService', function($http, $rootScope){

        var contracts = {
            // For contract viewing this should be /contract/{1}/view ==> {
        //    "buy": 0,
        //    "id": "string",
        //    "imageName": "string",
        //    "judgeStatement": "string",
        //    "last": 0,
        //    "longDesc": "string",
        //    "marketId": 0,
        //    "name": "string",
        //    "sell": 0,
        //    "shortDesc": "string",
        //    "type": 0
        //}
        //   instead but all of the info is here for the entire contract instead.

        // contractID : contract obj

            "1" : {"buy": 1.20, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0001", "imageName": "gold", "judgeDate": "00/00/00",
            "judgeStatement": "string", "last": 1.09, "longDesc": "string", "marketId": 0, "name": "GOLD.15APR15.HI","sell": 1.15, "shortDesc": "Will Gold prices rise", "startDate": "00/00/00",
            "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "2" : {"buy": 0.89, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0002", "imageName": "gold", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.88, "longDesc": "string", "marketId": 0, "name": "GOLD.15APR15.LOW","sell":0.92, "shortDesc": "Will Gold prices Fall", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "3" : {"buy": 0.89, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0003", "imageName": "gold", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.83, "longDesc": "string", "marketId": 0, "name": "GOLD.15APR15.MID","sell":0.75, "shortDesc": "Will Gold prices stay the same", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "4" : {"buy": 1.23, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0004", "imageName": "johnKey", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 1.20, "longDesc": "string", "marketId": 0, "name": "JOHN.KEY.REMAINS.2015","sell":1.24, "shortDesc": "Will John Key Remain New Zealands prime minister in 2016", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "5" : {"buy": 0.49, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0005", "imageName": "money", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.48, "longDesc": "string", "marketId": 0, "name": "NZD.FALL.BELLOW.0.70","sell":0.42, "shortDesc": "Will NZD continue to fall bellow $0.70", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "6" : {"buy": 0.20, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0006", "imageName": "money", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.18, "longDesc": "string", "marketId": 0, "name": "NZD.RAISE.ABOVE.0.70","sell":0.18, "shortDesc": "Will NZD raise back up to above $0.70", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "7" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0007", "imageName": "leakyHome", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "LEAKY.HOME.COST.2M","sell":0.32, "shortDesc": "Will the Leaking home cost the government 200 million in repair costs in 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "8" : {"buy":0.55, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0008", "imageName": "leakyHome", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.54, "longDesc": "string", "marketId": 0, "name": "LEAKY.HOME.COST.5M","sell":0.52, "shortDesc": "Will the Leaking home cost the government 500 million in repair costs in 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "9" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0009", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "WELL.EARTHQUAKE.LOW","sell":0.32, "shortDesc": "Will Wellington area receive a 4.0 to 4.8 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "10" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0010", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "WELL.EARTHQUAKE.MID","sell":0.32, "shortDesc": "Wellington to receive a 4.9 to 5.4 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "11" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0011", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "WELL.EARTHQUAKE.HI","sell":0.32, "shortDesc": "Wellington to receive a 5.5 to 5.8 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "12" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0012", "imageName": "earthquake", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "WELL.EARTHQUAKE.VHI","sell":0.32, "shortDesc": "Wellington to receive an Earthquake above 5.8 in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 }
        };

        var serviceFunctions = {

            getContract: function(id){
                return contracts[id];
            },

            getAllContracts: function() {
                contract_list = [];
                for(contact in contracts){
                    contract_list.push(contracts[contract]);
                }
                return contract_list;
            }

        };
        return serviceFunctions
    });