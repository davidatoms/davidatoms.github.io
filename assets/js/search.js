// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const middlePane = document.querySelector('.middle-pane');
    let searchableItems = [];
    let originalContent = '';
    
    if (searchInput && middlePane) {
        // Store original content
        originalContent = middlePane.innerHTML;
        
        // Initialize searchable items
        initializeSearchableItems();
        
        // Add search event listeners
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keydown', handleSearchKeydown);
        
        // Clear search when escape is pressed (integrate with hotkeys)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                clearSearch();
            }
        });
    }
    
    function initializeSearchableItems() {
        searchableItems = [];
        
        // Find all searchable content blocks
        const columnSets = middlePane.querySelectorAll('column-set');
        
        columnSets.forEach((columnSet, index) => {
            const titleUnit = columnSet.querySelector('column-unit[slot="0"]');
            const contentUnit = columnSet.querySelector('column-unit[slot="1"]');
            
            if (titleUnit && contentUnit) {
                const item = {
                    index: index,
                    element: columnSet,
                    title: titleUnit.textContent.trim(),
                    content: contentUnit.textContent.trim(),
                    titleElement: titleUnit,
                    contentElement: contentUnit,
                    originalTitleHTML: titleUnit.innerHTML,
                    originalContentHTML: contentUnit.innerHTML
                };
                
                searchableItems.push(item);
            }
        });
        
        console.log(`Found ${searchableItems.length} searchable items`);
    }
    
    function handleSearch(e) {
        const query = e.target.value.trim().toLowerCase();
        
        if (query === '') {
            clearSearch();
            return;
        }
        
        searchAndFilter(query);
    }
    
    function handleSearchKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim().toLowerCase();
            if (query) {
                focusFirstResult();
            }
        }
    }
    
    function searchAndFilter(query) {
        let matchCount = 0;
        
        searchableItems.forEach(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const contentMatch = item.content.toLowerCase().includes(query);
            const hasMatch = titleMatch || contentMatch;
            
            if (hasMatch) {
                matchCount++;
                
                // Show the item
                item.element.style.display = 'block';
                
                // Highlight matches
                highlightMatches(item, query);
                
                // Add search result styling
                item.element.style.backgroundColor = 'rgba(255, 255, 0, 0.1)';
                item.element.style.border = '1px solid rgba(255, 193, 7, 0.3)';
                item.element.style.borderRadius = '4px';
                item.element.style.padding = '10px';
                item.element.style.marginBottom = '10px';
                
            } else {
                // Hide non-matching items
                item.element.style.display = 'none';
            }
        });
        
        // Show search results summary
        showSearchSummary(query, matchCount);
    }
    
    function highlightMatches(item, query) {
        // Highlight in title
        if (item.title.toLowerCase().includes(query)) {
            const highlightedTitle = highlightText(item.originalTitleHTML, query);
            item.titleElement.innerHTML = highlightedTitle;
        }
        
        // Highlight in content
        if (item.content.toLowerCase().includes(query)) {
            const highlightedContent = highlightText(item.originalContentHTML, query);
            item.contentElement.innerHTML = highlightedContent;
        }
    }
    
    function highlightText(text, query) {
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<mark style="background-color: yellow; padding: 2px; border-radius: 2px;">$1</mark>');
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function clearSearch() {
        // Clear search input
        searchInput.value = '';
        
        // Restore original content
        searchableItems.forEach(item => {
            item.element.style.display = 'block';
            item.element.style.backgroundColor = '';
            item.element.style.border = '';
            item.element.style.borderRadius = '';
            item.element.style.padding = '';
            item.element.style.marginBottom = '';
            
            // Restore original HTML (removes highlights)
            item.titleElement.innerHTML = item.originalTitleHTML;
            item.contentElement.innerHTML = item.originalContentHTML;
        });
        
        // Hide search summary
        hideSearchSummary();
    }
    
    function focusFirstResult() {
        const firstVisibleItem = searchableItems.find(item => 
            item.element.style.display !== 'none'
        );
        
        if (firstVisibleItem) {
            firstVisibleItem.element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add temporary focus styling
            firstVisibleItem.element.style.boxShadow = '0 0 15px rgba(0, 123, 204, 0.5)';
            setTimeout(() => {
                firstVisibleItem.element.style.boxShadow = '';
            }, 2000);
        }
    }
    
    function showSearchSummary(query, matchCount) {
        // Remove existing summary
        hideSearchSummary();
        
        // Create new summary
        const summary = document.createElement('div');
        summary.id = 'search-summary';
        summary.style.cssText = `
            background: rgba(0, 123, 204, 0.1);
            border: 1px solid rgba(0, 123, 204, 0.3);
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #333;
        `;
        
        const resultText = matchCount === 1 ? 'result' : 'results';
        summary.innerHTML = `
            <strong>Search Results:</strong> ${matchCount} ${resultText} found for "${query}"
            <button onclick="clearSearch()" style="float: right; background: none; border: none; color: #666; cursor: pointer; font-size: 16px;">&times;</button>
        `;
        
        // Insert summary at the top of middle pane (after search bar)
        const searchBar = middlePane.querySelector('.search-bar');
        if (searchBar) {
            searchBar.insertAdjacentElement('afterend', summary);
        } else {
            middlePane.insertBefore(summary, middlePane.firstChild);
        }
    }
    
    function hideSearchSummary() {
        const existingSummary = document.getElementById('search-summary');
        if (existingSummary) {
            existingSummary.remove();
        }
    }
    
    // Make clearSearch globally available
    window.clearSearch = clearSearch;
    
    // Enhanced search with hotkey integration
    function enhancedFocusSearch() {
        searchInput.focus();
        searchInput.select();
        
        // If there's existing content, clear it for fresh search
        if (searchInput.value.trim()) {
            clearSearch();
        }
    }
    
    // Make enhanced focus available globally for hotkey system
    window.enhancedFocusSearch = enhancedFocusSearch;
}); 