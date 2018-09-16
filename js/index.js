$(function () {
    let weather;
    $.ajax({
        url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType: "jsonp",
        success: function (res) {
            weather = res.data.weather;
            randow(weather);
        }
    })

    function randow(obj) {
        $("h5").html(obj.city_name);
        $(".bb span").html(obj.quality_level);
        $("h2").html(obj.current_temperature + "°");
        $(".banner>p").html(obj.current_condition);
        $(".banner>h6").html(obj.wind_direction);
        $(".now .qw").html(obj.low_temperature + "/" + obj.high_temperature + "℃");
        $(".now .bh").html(obj.current_condition);
        $(".now .tq").attr("style", `background-image:url(img/${obj.dat_weather_icon_id}.png)`);
        $(".next .qw").html(obj.tomorrow_low_temperature + "/" + obj.tomorrow_high_temperature + "℃");
        $(".next .bh").html(obj.tomorrow_condition);
        $(".next .tq").attr("style", `background-image: url(img/${obj.tomorrow_weather_icon_id}.png)`);


        let str;
        obj.hourly_forecast.forEach(value => {
            str = `<li>
            <div class="time">${value.hour}:00</div>
            <div class="tq" style="background-image: url('img/${value.weather_icon_id}.png')" ></div>
            <h6>${value.temperature}<span>°</span></h6>
        </li>`;
            $(".box1 ul").append(str);
        })


        let str1 = "";
        obj.forecast_list.forEach(value => {
            str1 = `<li>
            <span>${value.date}</span>
            <span>${value.low_temperature}/${value.high_temperature}℃</span>
            <h5>${value.condition}</h5>
            <div class="tq" style="background-image: url('img/${value.weather_icon_id}.png')"></div>
            <span>${value.wind_direction}</span>
            <span>${value.wind_level}级</span>
        </li>`;
            $(".box2 ul").append(str1);
        })
    }
})