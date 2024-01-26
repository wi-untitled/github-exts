import { Assets } from "..";
import { render } from "@testing-library/react";

describe("<Assets />", () => {
    test("should make snapshot", () => {
        const component = render(<Assets />);

        expect(component).toMatchSnapshot();
    });
});
