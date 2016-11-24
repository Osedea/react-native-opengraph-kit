# react-native-opengraph-kit
A set of components and utils useful to extract opengraph data directly from your react-native app

For react-native v0.26+

# Properties

## OpenGraphAwareInput

Property Name | Type | Description
--- | --- | ---
containerStyle | View.propTypes.style | A style to pass to customize the style of the container
onChange | React.PropTypes.func | The function to call on change in the TextInput
textInputStyle | TextInput.propTypes.style | A style to pass to customize the style of the textInput

## OpenGraphDisplay

Property Name | Type | Description
--- | --- | ---
data | React.PropTypes.shape({ <br>    url: React.PropTypes.string, <br>    image: React.PropTypes.string,<br>    title: React.PropTypes.string,<br>    description: React.PropTypes.string,<br>}).isRequired | The data gotten out of the `OpenGraphAwareInput` or the `OpenGraphParser`
containerStyle | View.propTypes.style | A style to pass to customize the style of the container
imageStyle | Image.propTypes.style | A style to pass to customize the style of the image
textContainerStyle | View.propTypes.style | A style to pass to customize the style of the textContainer
titleStyle | Text.propTypes.style | A style to pass to customize the style of the title
descriptionStyle | Text.propTypes.style | A style to pass to customize the style of the description
urlStyle | Text.propTypes.style | A style to pass to customize the style of the url
urlOnlyContainerStyle | View.propTypes.style | A style to pass to customize the style of the urlOnlyContainer
