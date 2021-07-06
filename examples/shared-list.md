## Component

```php
/**
 * @property Collection $categories
 */
class SharedList extends Component
{
    /**
     * @param array $payload
     * @return void
     */
    public function updateOrder(array $payload): void
    {
        foreach($payload['dirty'] as $item) {
            Task::query()
                ->whereKey($item['value'])
                ->update(['order' => $item['order']]);

            if ($item['group']['oldValue'] !== $item['group']['newValue']) {
                DB::table('task_categories')
                    ->where('task_id', $item['value'])
                    ->where('category_id', $item['group']['oldValue'])
                    ->update(['category_id' => $item['group']['newValue']]);
            }
        }
    }

    /**
     * @return Collection
     */
    public function getCategoriesProperty(): Collection
    {
        return Category::query()
            ->with(['tasks' => function (BelongsToMany $query) {
                $query->orderBy('order');
            }])
            ->limit(2)
            ->get();
    }

    /**
     * @return View
     */
    public function render(): View
    {
        $categories = $this->categories;

        return view('livewire.shared-list', compact('categories'));
    }
}
```

## View

```html
<div class="flex flex-row gap-x-8 items-start" wire:sortable-group="updateOrder">
    @foreach($categories as $category)
        <div class="flex flex-col justify-start items-start w-2/5 gap-y-8">
            <span
                class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium shadow-sm"
                style="color: {{ $category->color }}; background-color: {{ $category->color }}50;"
            >
                {{ $category->title }}
            </span>

            <div class="bg-white shadow overflow-hidden sm:rounded-md w-full">
                <ul
                    wire:sortable-group.item="{{ $category->id }}"
                    wire:sortable.group="shared"
                    wire:sortable.animation="150"
                    class="divide-y divide-gray-200"
                >
                    @foreach($category->tasks as $task)
                        <li wire:sortable.item="{{ $task->id }}">
                            <div class="block hover:bg-gray-50 cursor-pointer">
                                <div class="flex flex-col justify-start px-4 py-4 sm:px-6">
                                    <span class="truncate">#{{ $task->id }} — {{ $task->title }}</span>
                                    <span class="text-sm text-gray-800 truncate">
                                        {{ $task->description }}
                                    </span>
                                </div>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endforeach
</div>
```
