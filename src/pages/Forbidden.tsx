/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Link } from "react-router-dom";

import HeaderBar from "../components/HeaderBar";
import { mainTextStyles, navigationStyles, returnButtonStyles, unselectable } from "../commonStyles";

export default function Forbidden(): JSX.Element {
    return <div>
        <HeaderBar />
        <div css={css`width: 80%; margin: auto;`}>
            <div css={mainTextStyles}>
                <h1>403 (Forbidden)</h1>
                <p>You do not have access to this data.</p>
            </div>
            <div css={[unselectable, navigationStyles]}>
                <Link css={returnButtonStyles} to="/">Return Home</Link>
            </div>
        </div>
    </div>;
}
