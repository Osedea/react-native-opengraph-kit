# react-native-opengraph-kit
A set of components and utils useful to extract opengraph data directly from your react-native app, with almost no dependency.

For react-native v0.26+

# Prerequesites

Be sure to have in your `Info.plist`

```
<key>NSAppTransportSecurity</key>
<!--See http://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/ -->
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    ...
</dict>
```

# Subcomponents

```
import { OpenGraphAwareInput, OpenGraphDisplay, OpenGraphParser } from 'react-native-opengraph-kit';
```

## OpenGraphAwareInput

```
<OpenGraphAwareInput
    containerStyle={styles.textInputContainer}
    textInputStyle={styles.textInput}
    onChange={this.doWhatIWantWithTheContent}
/>
```

Property Name | Type | Description
--- | --- | ---
containerStyle | View.propTypes.style | A style to pass to customize the style of the container
onChange | React.PropTypes.func | The function to call on change in the TextInput
textInputStyle | TextInput.propTypes.style | A style to pass to customize the style of the textInput

## OpenGraphDisplay

Fully customizable widget for the extracted data

```
<OpenGraphDisplay
    data={this.state.dataIGotFromTheParser}
/>
```

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

## OpenGraphParser

Where the magic happens

```
handleTextChange = (event) => {
    OpenGraphParser.extractMeta(event.nativeEvent.text)
    .then((data) => {
        this.setState({ data });
    })
    .catch((error) => {
        console.log(error);
    });
}

render() {
    return (
        <TextInput
            onChange={this.handleTextChange}
        />
    );
}
```

Example of `data` object:

```
{
    description: "We're a young and inspired team that leverages technical knowledge to turn ideas into creative and efficient digital solutions.",
    image: "https://osedea.com/images/thumbnail-osedea-1.png",
    title: "OSEDEA | Digital Efficiency & Creativity",
    type: "website",
    url: "http://osedea.com",
}
```

See simple React-native example project in [example](./example) for a working example
