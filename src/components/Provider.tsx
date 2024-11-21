import { ThemeProvider } from "@emotion/react";
import { Theme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
	children: React.ReactNode;
	client: QueryClient;
	theme: Theme;
	dateAdapter: typeof AdapterDayjs;
}

const Provider = ({ children, client, theme, dateAdapter }: Props) => (
	<SessionProvider>
		<QueryClientProvider client={client}>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={dateAdapter}>
					{children}
				</LocalizationProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</SessionProvider>
);

export default Provider;
