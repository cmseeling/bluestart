<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import WeatherIcon from './WeatherIcon.svelte';

    const { Story } = defineMeta({
        title: 'Components/Base/WeatherIcon',
        component: WeatherIcon,
    });
</script>

<Story name="Variants">
    <div>
        <p>Sunny</p>
        <WeatherIcon weatherCondition="Sunny" />
    </div>
    <div>
        <p>PartlyCloudy</p>
        <WeatherIcon weatherCondition="PartlyCloudy" />
    </div>
    <div>
        <p>Cloudy</p>
        <WeatherIcon weatherCondition="Cloudy" />
    </div>
    <div>
        <p>VeryCloudy</p>
        <WeatherIcon weatherCondition="VeryCloudy" />
    </div>
    <div>
        <p>Fog</p>
        <WeatherIcon weatherCondition="Fog" />
    </div>
    <div>
        <p>LightRain</p>
        <WeatherIcon weatherCondition="LightRain" />
    </div>
    <div>
        <p>HeavyRain</p>
        <WeatherIcon weatherCondition="HeavyRain" />
    </div>
    <div>
        <p>HeavyShowers</p>
        <WeatherIcon weatherCondition="HeavyShowers" />
    </div>
    <div>
        <p>LightShowers</p>
        <WeatherIcon weatherCondition="LightShowers" />
    </div>
    <div>
        <p>LightSnow</p>
        <WeatherIcon weatherCondition="LightSnow" />
    </div>
    <div>
        <p>LightSnowShowers</p>
        <WeatherIcon weatherCondition="LightSnowShowers" />
    </div>
    <div>
        <p>HeavySnow</p>
        <WeatherIcon weatherCondition="HeavySnow" />
    </div>
    <div>
        <p>HeavySnowShowers</p>
        <WeatherIcon weatherCondition="HeavySnowShowers" />
    </div>
    <div>
        <p>LightSleet</p>
        <WeatherIcon weatherCondition="LightSleet" />
    </div>
    <div>
        <p>LightSleetShowers</p>
        <WeatherIcon weatherCondition="LightSleetShowers" />
    </div>
    <div>
        <p>ThunderyHeavyRain</p>
        <WeatherIcon weatherCondition="ThunderyHeavyRain" />
    </div>
    <div>
        <p>ThunderyShowers</p>
        <WeatherIcon weatherCondition="ThunderyShowers" />
    </div>
    <div>
        <p>ThunderySnowShowers</p>
        <WeatherIcon weatherCondition="ThunderySnowShowers" />
    </div>
</Story>
