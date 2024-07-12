/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Form, FormFeatures, getForms } from "../../api/forms";
import colors from "../../colors";
import * as styles from "../../commonStyles";
import HeaderBar from "../../components/HeaderBar";
import Loading from "../../components/Loading";
import ScrollToTop from "../../components/ScrollToTop";
import Tag from "../../components/Tag";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const tableStyles = css`
    * & {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: separate;
    }

    th, td {
        text-align: left;
        padding: 0.5rem;
        height: 100%;
        white-space: normal;
    }
    th {
        border-bottom: 1px solid ${colors.darkerGreyple};
    }

    td {
        border-top: 1px solid ${colors.darkerGreyple};
    }

    .description {
        width: fit-content;
        font-weight: 300;
        font-size: 0.875em;
    }
`;

const formLinkStyles = css`
    color: ${colors.blurple};
    text-decoration: none;

    &: hover {
        text-decoration: underline;
    }
`;

function FormTable(): JSX.Element {
    const [forms, setForms] = useState<Form[]>();

    useEffect(() => {
        const fetchForms = async () => {
            setForms(await getForms());
        };
        fetchForms().then();
    }, []);

    if (!forms) {
        return <Loading />;
    }

    return <div css={tableStyles}>
        <table>
            <thead>
                <tr>
                    <th scope="col">Form</th>
                    <th scope="col">Status</th>
                    <th scope="col">Questions</th>
                </tr>
            </thead>
            <tbody>
                {forms.map(form => (<tr>
                    <td>
                        <Link to={`/staff/${form.id}`} css={formLinkStyles}>{form.name}</Link>
                        <div className="description">{form.description}</div>
                    </td>
                    <td>{
                        form.features.includes(FormFeatures.Open)
                            ? <Tag text="Open" color={colors.success} />
                            : <Tag text="Closed" color={colors.error} />
                    }</td>
                    <td>{form.questions.length}</td>
                </tr>))}
            </tbody>
        </table>
    </div >;
}

const titleRowStyles = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
});

const newButtonStyles = [
    styles.genericButtonStyles(colors.blurple, colors.greyple),
    css({ fontSize: "1.25rem", padding: "0.25em 1em" }),
];

export default function StaffHomePage(): JSX.Element {
    return <div>
        <HeaderBar title="Staff" description="Manage forms" />
        <ScrollToTop />
        <div css={css`max-width: min(80%, 48rem); margin: 0 auto;`}>
            <div css={titleRowStyles}>
                <h1>Manage Forms</h1>
                <Link to="/staff/new" css={newButtonStyles}>New Form</Link>
            </div>
            <FormTable />
        </div>
    </div>
}
