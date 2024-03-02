export const hashtagWrapper = (tag) => {
    
    if(tag.charAt(0) === "#") return tag

    const wrappedTag = `#${tag}`
    return wrappedTag
}