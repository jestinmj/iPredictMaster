/**

 * Created by Jestin on 05-08-2015.

 */

angular.module('app.controllers.rankings', ["ionic"])



    .controller('RankingsCtrl', function($scope) {



        $scope.toggle={

            ownStock:true,

            shortStock: true,

            graph: true

        };



        $scope.portfolio={

            myRank:1,

            changeInRank:2,

            myWorth:20.05,

            changeInWorth:0.07,

            myWallet:12.74,

            changeInWallet:"NC",

            myPortfolio:7.39,

            changeInPortfolio:0.07

        };



        $scope.traders=

            [

                {name:'John', prevRank:5, country: 'France', amount:585},

                {name:'Jessie', prevRank:3, country: 'NZ', amount:506},

                {name:'Johanna', prevRank:2, country: 'UK', amount:475},

                {name:'Joy', prevRank:7, country: 'China', amount:423},

                {name:'Mary', prevRank:8, country: 'Australia', amount:399},

                {name:'Peter', prevRank:9, country: 'Moscow', amount:388},

                {name:'Sebastian', prevRank:6, country: 'Germany', amount:345},

                {name:'Erika', prevRank:1, country: 'Ukraine', amount:300},

                {name:'Patrick', prevRank:12, country: 'Poland', amount:265},

                {name:'Samantha', prevRank:17, country: 'Paraguay', amount:256}

            ]



    });

