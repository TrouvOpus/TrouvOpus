import React from "react"
import { Tab, Card } from "@material-ui/core"
import { TabPanel, TabList, TabContext } from "@material-ui/lab"

import Resume from "../components/Resume"

export default _ => {
	const [active, setActive] = React.useState("Profile")
	return (
		<div className="Profile">
			<Card>
				<TabContext value={active}>
					<TabList
						onChange={(event, newValue) => setActive(newValue)}
						aria-label="simple tabs example"
					>
						<Tab label="Profile" value="Profile" />
						<Tab label="Resume" value="Resume" />
						<Tab label="Ads" value="Ads" />
					</TabList>
					<TabPanel value="Profile"> Settings </TabPanel>
					<TabPanel value="Resume">
						<Resume />
					</TabPanel>
					<TabPanel value="Ads"> Ads </TabPanel>
				</TabContext>
			</Card>
		</div>
	)
}
