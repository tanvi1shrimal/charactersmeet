// User Controller for make Login Analytics chart
app.controller('loginAnalyticsCtrl', function ($scope, loginAnalyticsChartData,$window) {
    
    //Function for get login line chart data
    $scope.loginAnalyticsChart = function () {
        //get starting date/end_date from top selected date, day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.filter = $("#filter_val").val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            Filter:$scope.filter,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        
        loginAnalyticsChartData.loginAnalyticsData(reqData).then(function (response) {
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Email analytics  */
                if ($.isEmptyObject(response.Data) == true) {
                    $("#logincount_label").html('0');
                    $("#loginLineChart").html('<div class="no-signups-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>');
                }else{
                    google.setOnLoadCallback(drawLoginLineChart(response.Data, $scope.filter));
                }
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }            
        });
    };

    //Function for get source of login chart data
    $scope.loginSourceLoginChart = function () {        
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        
        ShowAnalyticLoader("SourceLoginChart");
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.SourceLoginChart(reqData).then(function (response) {
            HideAnalyticLoader("SourceLoginChart");
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Source of login chart */
                if ($.isEmptyObject(response.Data) == true) {
                    $("#SourceLoginChart").html('<div class="no-sources-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>').addClass('top0');
                }else{
                    $(".loginchart_div").removeClass('top0');
                    google.setOnLoadCallback(drawSourceLoginChart(response.Data));
                }                
                $scope.loginDeviceChart();
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }
            
        });
    };

    //Function for get device chart data
    $scope.loginDeviceChart = function () {        
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        
        ShowAnalyticLoader("loginDeviceChart");
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.loginDeviceChart(reqData).then(function (response) {
            HideAnalyticLoader("loginDeviceChart");
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Login Device */
                if ($.isEmptyObject(response.Data) == true) {
                    $("#loginDeviceChart").html('<div class="no-sources-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>').addClass('top0');
                }else{
                    $(".loginchart_div").removeClass('top0');
                    google.setOnLoadCallback(drawLoginDeviceChart(response.Data));
                }
                
                $scope.loginUsernameEmailChart();
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }            
        });
    };

    //Function for get Username/Email chart data
    $scope.loginUsernameEmailChart = function () {        
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        ShowAnalyticLoader("loginUsernameEmailChart");
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.loginUsernameEmailChart(reqData).then(function (response) {
            HideAnalyticLoader("loginUsernameEmailChart");
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Login Username/Email */                
                if ($.isEmptyObject(response.Data) == true) {
                    $("#loginUsernameEmailChart").html('<div class="no-sources-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>').addClass('top0');
                }else{
                    $(".loginchart_div").removeClass('top0');
                    google.setOnLoadCallback(drawLoginUsernameEmailChart(response.Data));
                }
                $scope.loginFirstTimeChart();
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }            
        });
    };

    //Function for get FirstTime Login chart data
    $scope.loginFirstTimeChart = function () {
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        ShowAnalyticLoader("loginFirstTimeChart");
        
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.loginFirstTimeChart(reqData).then(function (response) {
            HideAnalyticLoader("loginFirstTimeChart");
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Login First Time */                
                if ($.isEmptyObject(response.Data) == true) {
                    $("#loginFirstTimeChart").html('<div class="no-sources-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>').addClass('top0');
                }else{
                    $(".loginchart_div").removeClass('top0');
                    google.setOnLoadCallback(drawLoginFirstTimeChart(response.Data));
                }
                //$scope.loginPopDaysChart();
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }            
        });
    };

    //Function for get PopularDays Login chart data
    $scope.loginPopDaysChart = function () {
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        ShowAnalyticLoader("loginPopDaysChart");
        
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.loginPopDaysChart(reqData).then(function (response) {
            HideAnalyticLoader("loginPopDaysChart");
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Login Popular Days */
                
                if ($.isEmptyObject(response.Data) == true) {
                    $("#loginPopDaysChart").html('<div class="no-timetaken-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>').addClass('top0');
                }else{
                    $(".populardaychart").removeClass('top0');
                    google.setOnLoadCallback(drawLoginPopDaysChart(response.Data));
                }
                //$scope.loginPopTimeChart();
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }
        });
    };

    //Function for get PopularTime Login chart data
    $scope.loginPopTimeChart = function () {
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        ShowAnalyticLoader("loaderdiv");
        
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.loginPopTimeChart(reqData).then(function (response) {
            HideAnalyticLoader("loaderdiv");
            /* Draw google chart for Login Popular Time */
            if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }else{
                if (response != null)
                {
                    if (response.Data.length > 0)
                    {
                        $("#loginPopTimeChart").find(".figwrap").removeClass('hide');
                        $("#populartimechart").addClass("hide");
                        $("#dvAMChart").show();

                        $("#spnAM1").html("0"); $("#spnAM2").html("0"); $("#spnAM3").html("0"); $("#spnAM4").html("0");
                        $("#spnPM1").html("0"); $("#spnPM2").html("0"); $("#spnPM3").html("0"); $("#spnPM4").html("0");

                        for (var i = 0; i < response.Data.length; i++)
                        {
                            if (response.Data[i].TimeSlotID < 5)
                            {
                                switch (response.Data[i].TimeSlotID)
                                {
                                    case '1':
                                        $("#spnAM2").html(response.Data[i].LoginCount);
                                    break;

                                    case '2':
                                        $("#spnAM3").html(response.Data[i].LoginCount);
                                    break;

                                    case '3':
                                        $("#spnAM4").html(response.Data[i].LoginCount);
                                    break;

                                    case '4':
                                        $("#spnAM1").html(response.Data[i].LoginCount);
                                    break;
                                }
                            }

                            if (response.Data[i].TimeSlotID > 4)
                            {
                                $("#dvPMChart").show();
                                switch (response.Data[i].TimeSlotID)
                                {
                                    case '5':
                                        $("#spnPM2").html(response.Data[i].LoginCount);
                                    break;

                                    case '6':
                                        $("#spnPM3").html(response.Data[i].LoginCount);
                                    break;

                                    case '7':
                                        $("#spnPM4").html(response.Data[i].LoginCount);
                                    break;

                                    case '8':
                                        $("#spnPM1").html(response.Data[i].LoginCount);
                                    break;
                                }
                            }

                        }
                    }else{
                        $("#dvAMChart").show();
                        $("#dvPMChart").show();

                        $("#spnAM1").html("0"); $("#spnAM2").html("0"); $("#spnAM3").html("0"); $("#spnAM4").html("0");
                        $("#spnPM1").html("0"); $("#spnPM2").html("0"); $("#spnPM3").html("0"); $("#spnPM4").html("0");
                        $("#loginPopTimeChart").find(".figwrap").addClass('hide');
                        $("#populartimechart").removeClass("hide").html('<div class="no-populardays-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>');
                    }
                }
            }
            
            //$scope.loginFailureChart();
        });
    };

    //Function for get Login Failure chart data
    $scope.loginFailureChart = function () {
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        ShowAnalyticLoader("loginFailureChart");
        
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.loginFailureChart(reqData).then(function (response) {
            HideAnalyticLoader("loginFailureChart");
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Login Popular Days */
                
                if ($.isEmptyObject(response.Data) == true) {
                    $("#loginFailureChart").html('<div class="no-acceptance-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>').addClass('top0');
                }else{
                    $("#loginFailureChart").removeClass('top0');
                    google.setOnLoadCallback(drawLoginFailureChart(response.Data));
                }
                //$scope.loginGeoChart();
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }            
        });
    };

    //Function for get Login Geo chart data
    $scope.loginGeoChart = function () {
        //get starting date/end_date from top selected date,day filter from page and AdminLoginSessionKey
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        ShowAnalyticLoader("loginGeoChart");
        
        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        loginAnalyticsChartData.loginGeoChart(reqData).then(function (response) {
            HideAnalyticLoader("loginGeoChart");
            if (response.ResponseCode == 200 || response.ResponseCode == 672){
                /* Draw google chart for Login Geo location */
                if ($.isEmptyObject(response.Data) == true) {
                    $("#loginGeoChart").html('<div class="no-location-bg"><p>'+ThereIsNoHistoricalDataToShow+'</p></div>');
                }else{
                    google.setOnLoadCallback(drawLoginGeoChart(response.Data));
                }                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }            
        });
    };

});