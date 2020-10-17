import React from 'react'
import DropDownItem from './DropDownItem'
import DropDownFooter from './DropDownFooter'

export default function ToBeDropped({totalNotifications}) {
    return (
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              {totalNotifications} Notifications
            </span>
            <div className="dropdown-divider" />
            <DropDownItem number="3" text="new messages" time="3 mins" />
            <DropDownItem number="4" text="new reports" time="2 days" icon="fa-bell" />
            <DropDownFooter />
          </div>
    )
}
