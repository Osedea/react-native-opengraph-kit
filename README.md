# react-native-opengraph-kit
A set of components and utils useful to extract opengraph data directly from your react-native app

For react-native v0.26+

# Properties

## OpenGraphAwareInput

Property Name | Type
--- | ---
containerStyle | View.propTypes.style
onChange | React.PropTypes.func
textInputStyle | TextInput.propTypes.style

## OpenGraphDisplay

Property Name | Type
--- | ---
data | React.PropTypes.shape({ <br>url: React.PropTypes.string, <br>image: React.PropTypes.string,<br>title: React.PropTypes.string,<br>description: React.PropTypes.string,<br>}).isRequired
