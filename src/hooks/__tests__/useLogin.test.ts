import { renderHook, act } from "@testing-library/react";
import { useLogin } from "..";
import { MainScreen } from "src/screens";

const getUserDataMock = vi.fn().mockReturnValue({ id: 1, name: "John Doe" });
const navigateMock = vi.fn();

vi.mock("src/hooks/useService", () => ({
    useService: () => ({
        getUserData: getUserDataMock,
    }),
}));

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock,
}));

describe("useLogin", () => {
    test("should update accessToken on input change", () => {
        const { result } = renderHook(() =>
            useLogin({
                onButtonClickSuccess: vi.fn(),
            }),
        );

        act(() => {
            result.current.handleInputChange({
                target: {
                    value: "newAccessToken",
                },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.accessToken).toBe("newAccessToken");
    });

    test("should call onButtonClickSuccess and navigate to MainScreen on button click if getUserData returns data", async () => {
        const onButtonClickSuccessMock = vi.fn();

        const { result } = renderHook(() =>
            useLogin({
                onButtonClickSuccess: onButtonClickSuccessMock,
            }),
        );

        await act(async () => {
            await result.current.handleButtonClick();
        });

        expect(onButtonClickSuccessMock).toHaveBeenCalledWith(
            result.current.accessToken,
        );
        expect(navigateMock).toHaveBeenCalledWith(MainScreen.routeName);
    });
});
