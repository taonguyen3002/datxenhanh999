export const createMetaHtml = (acctributeName, content) => {
  const tag = document.createElement("meta");
  tag.name = acctributeName;
  tag.content = content;
  document.head.appendChild(tag);
};
