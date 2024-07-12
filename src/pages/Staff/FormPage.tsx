/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import Forbidden from "../Forbidden";
import NotFound from "../NotFound";
import { deleteForm, Form, getForm } from "../../api/forms";
import colors from "../../colors";
import * as styles from "../../commonStyles";
import HeaderBar from "../../components/HeaderBar";
import Loading from "../../components/Loading";
import ScrollToTop from "../../components/ScrollToTop";
import { AxiosError } from "axios";
import { createRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function deleteButton(id: string, name: string) {
    if (window.confirm(`Are you sure you would like to delete '${name}'?`)) {
        deleteForm(id);
    }
}

enum LoadingState {
    Pending,
    Found,
    Missing,
    Forbidden,
}

const titleRowStyles = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
});

const buttonStyles = (color: string, hover: string) => [
    styles.genericButtonStyles(color, hover),
    css({ fontSize: "1rem", padding: "0.25em 1em" }),
];

export default function StaffFormPage(): JSX.Element {
    const { id } = useParams<{ id: string }>();

    const [form, setForm] = useState<Form>();
    const [formLoading, setFormLoading] = useState<LoadingState>(LoadingState.Pending);

    useEffect(() => {
        // ID can't be null due to the routing to get here
        getForm(id!).then(form => {
            setForm(form);
            setFormLoading(LoadingState.Found);
        }).catch((error: AxiosError) => {
            if (error.response?.status === 404) {
                setFormLoading(LoadingState.Missing);
                return;
            } else if (error.response?.status === 403) {
                setFormLoading(LoadingState.Forbidden);
                return;
            }

            throw error;
        });
    }, []);

    switch (formLoading) {
        case LoadingState.Pending:
            return <Loading />;
        case LoadingState.Missing:
            return <NotFound message={"Could not find a matching form. Make sure the requested form exists and is open."} />;
        case LoadingState.Forbidden:
            return <Forbidden />;
    }

    return <div>
        <HeaderBar title="Manage Form" />
        <ScrollToTop />
        <div css={css`max-width: min(80%, 48rem); margin: 0 auto;`}>
            <div css={titleRowStyles}>
                <h1>Form: {form!.name}</h1>
                <div css={[titleRowStyles, { justifyContent: "center" }]}>
                    <Link
                        to={`/staff/${form!.id}/responses`}
                        css={buttonStyles(colors.blurple, colors.darkerBlurple)}
                    >Responses</Link>
                    <Link
                        to="/staff/new"
                        css={buttonStyles(colors.blurple, colors.darkerBlurple)}
                    >Edit</Link>
                    <button
                        onClick={() => deleteButton(form!.id, form!.name)}
                        css={buttonStyles(colors.error, colors.darkerError)}
                    >Delete</button>
                </div>
            </div>
        </div>
    </div>
}
