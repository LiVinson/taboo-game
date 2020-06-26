import React from "react"
import { shallow, mount } from "enzyme"
import renderer from "react-test-renderer"
import Header from "./Header"

it("Renders large header correctly", () => {
  const props = {
    location: {
      pathname: "/home",
    },
  }
  const HeaderComponent = renderer.create(<Header {...props} />).toJSON()
  expect(HeaderComponent).toMatchSnapshot()
})

it("Renders regular header correctly", () => {
  const props = {
    location: {
      pathname: "/play",
    },
  }
  const HeaderComponent = renderer.create(<Header {...props} />).toJSON()
  expect(HeaderComponent).toMatchSnapshot()
})

it("Receives a location prop with pathname property", () => {
  const props = {
    location: {
      pathname: "/home",
    },
  }

  const HeaderComponent = mount(<Header {...props} />)

  expect(HeaderComponent.prop("location")).toMatchObject({
    pathname: "/home",
  })
})

it("renders large header and subheading on home route", () => {
  const props = {
    location: {
      pathname: "/home",
    },
  }

  const HeaderComponent = shallow(<Header {...props} />)
  expect(HeaderComponent.find("h1.header--large")).toHaveLength(1)
  expect(HeaderComponent.find("h3.subheading")).toHaveLength(1)
})

it("renders reular header and no subheader on none-home route", () => {
  const props = {
    location: {
      pathname: "/play",
    },
  }

  const HeaderComponent = shallow(<Header {...props} />)
  expect(HeaderComponent.find("h1.header--large")).toHaveLength(0)
  expect(HeaderComponent.find("h3.subheading")).toHaveLength(0)
})
