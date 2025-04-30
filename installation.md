## Installation Guideline

### Prerequisites

This guide is for macOS users developing iOS apps with React Native. Follow these steps to set up your environment.


For a detailed setup guide, refer to the official React Native documentation: [React Native Setup Guide](https://reactnative.dev/docs/set-up-your-environment).


### Quick Overview
Before you begin, ensure you have met the following requirements:
- **Development OS**: This guide requires macOS with Android Studio or Xcode installed. These tools allow you to run Android emulators and iOS simulators.
- **Node & Watchman**: Use Homebrew to install these essential tools:

```bash
brew install node
brew install watchman
```
*Ensure your Node version is 18 or newer.*
- **Xcode**: Download and install the latest version of Xcode from the Mac App Store. Xcode includes the iOS Simulator and necessary tools for building iOS apps.

- **Xcode Command Line Tools**: Open Xcode, go to Preferences, and install the Command Line Tools under the Locations panel.

- **CocoaPods**: Install CocoaPods for managing iOS dependencies:
```bash
sudo gem install cocoapods
```

---

 **Note:** These are the basic steps to set up. For more detailed instructions, please check the official React Native documentation linked above.

---

### Installation

Clone the repository and install dependencies:

```bash
git https://github.com/mdyasenrafe/hospital-booking-system-front-end
cd hospital-booking-system-front-end
yarn
```


#### Running the Application

To start the application :

```bash
yarn start
```



