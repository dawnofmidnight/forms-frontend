/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import HeaderBar from "../../components/HeaderBar";
import ScrollToTop from "../../components/ScrollToTop";

export default function StaffNewPage(): JSX.Element {
    return <div>
        <HeaderBar title="New Form" description="Create a new form" />
        <ScrollToTop />
        <div css={css`max-width: min(80%, 48rem); margin: 0 auto;`}>
            <h1>New Form</h1>
        </div>
    </div>
}
