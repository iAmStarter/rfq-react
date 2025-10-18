import type { Notification, NotificationType } from "../../types";

const notificationTemplates = [
  { type: "approve" as NotificationType, text: "Your request has been approved", link: "/requests" },
  { type: "reject" as NotificationType, text: "Your request has been rejected", link: "/requests" },
  { type: "info" as NotificationType, text: "New policy updates are available", link: "/policies" },
  { type: "task" as NotificationType, text: "You have a new task assigned", link: "/tasks" },
  { type: "info" as NotificationType, text: "System maintenance scheduled", link: "/maintenance" },
  { type: "task" as NotificationType, text: "Please review the project updates", link: "/projects" },
  { type: "approve" as NotificationType, text: "Your leave request has been approved", link: "/leaves" },
  { type: "reject" as NotificationType, text: "Budget request has been rejected", link: "/budget" },
  { type: "task" as NotificationType, text: "New document requires your signature", link: "/documents" },
  { type: "info" as NotificationType, text: "Training session scheduled", link: "/training" },
  { type: "approve" as NotificationType, text: "Expense report approved", link: "/expenses" },
  { type: "task" as NotificationType, text: "Review pending approval", link: "/approvals" },
  { type: "info" as NotificationType, text: "Company announcement posted", link: "/announcements" },
  { type: "reject" as NotificationType, text: "Time-off request denied", link: "/timeoff" },
  { type: "task" as NotificationType, text: "Survey feedback needed", link: "/surveys" },
  { type: "approve" as NotificationType, text: "Purchase order approved", link: "/orders" },
  { type: "info" as NotificationType, text: "Security update required", link: "/security" },
  { type: "task" as NotificationType, text: "Performance review due", link: "/reviews" },
  { type: "approve" as NotificationType, text: "Travel request approved", link: "/travel" },
  { type: "info" as NotificationType, text: "New benefits available", link: "/benefits" },
];

export const fetchNotifications = async (): Promise<Notification[]> => {
  const notifications: Notification[] = [];

  for (let i = 1; i <= 99; i++) {
    const template = notificationTemplates[(i - 1) % notificationTemplates.length];
    notifications.push({
      id: i,
      type: template.type,
      text: `${template.text} #${i}`,
      link: `${template.link}/${i}`,
      unread: i % 3 !== 0,
      createdAt: Date.now() - (i * 60000),
    });
  }

  return notifications;
}