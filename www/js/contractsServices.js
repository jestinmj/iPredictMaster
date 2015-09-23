/**
 * Created by DanHenton on 23/09/15.
 */
angular.module('app.services.contracts', [])
    .factory('ContractServices', function($http, $rootScope){

        var contracts = {
        //Key = contractID : Value = contract obj
            "0001" : {"buy": 1.20, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0001", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 1.09, "longDesc": "string", "marketId": 0, "name": "GOLD.15APR15.HI","sell": 1.15, "shortDesc": "Will Gold prices rise", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0002" : {"buy": 0.89, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0002", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.88, "longDesc": "string", "marketId": 0, "name": "GOLD.15APR15.LOW","sell":0.92, "shortDesc": "Will Gold prices Fall", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0003" : {"buy": 0.89, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0003", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.83, "longDesc": "string", "marketId": 0, "name": "GOLD.15APR15.MID","sell":0.75, "shortDesc": "Will Gold prices stay the same", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0004" : {"buy": 1.23, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0004", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 1.20, "longDesc": "string", "marketId": 0, "name": "John Key remains prime minister in 2016","sell":1.24, "shortDesc": "Will John Key Remain New Zealands prime minister in 2016", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0005" : {"buy": 0.49, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0005", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.48, "longDesc": "string", "marketId": 0, "name": "NZ dollar dips below (USD) $0.63","sell":0.42, "shortDesc": "Will NZD continue to fall bellow $0.70", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0006" : {"buy": 0.20, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0006", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.18, "longDesc": "string", "marketId": 0, "name": "NZ dollar dips raise above (USD) $0.70","sell":0.18, "shortDesc": "Will NZD raise back up to above $0.70", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0007" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0007", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "Leaking Homes costing the NZ government 200 Million in 2015","sell":0.32, "shortDesc": "Will the Leaking home cost the government 200 million in repair costs in 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0008" : {"buy":0.55, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0008", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.54, "longDesc": "string", "marketId": 0, "name": "Leaking Homes costing the NZ government 500 Million in 2015","sell":0.52, "shortDesc": "Will the Leaking home cost the government 500 million in repair costs in 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0009" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0009", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "Wellington to receive an 4.0 to 4.8 Earthquake in 2015","sell":0.32, "shortDesc": "Will Wellington area receive a 4.0 to 4.8 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0010" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0010", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "Wellington to receive an 4.9 to 5.4 Earthquake in 2015","sell":0.32, "shortDesc": "Wellington to receive a 4.9 to 5.4 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0011" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0011", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "Wellington to receive an 5.5 to 5.8 Earthquake in 2015","sell":0.32, "shortDesc": "Wellington to receive a 5.5 to 5.8 Earthquake in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 },
            "0012" : {"buy":0.35, "catId": 0, "dateModified": "00/00/00", "featuredText": "string", "id": "0012", "imageName": "string", "judgeDate": "00/00/00",
                "judgeStatement": "string", "last": 0.35, "longDesc": "string", "marketId": 0, "name": "Wellington to receive an Earthquake above 5.8 in 2015","sell":0.32, "shortDesc": "Wellington to receive an Earthquake above 5.8 in before the end of 2015", "startDate": "00/00/00",
                "tagIds": {
                    "tagId": [0]}, "type": 0 }
        };


        var serviceFunctions = {

            getContract: function(id){
                return contracts[id];
            },

            getAllContracts: function() {
                return contracts;
            }

        };
        return serviceFunctions
    });